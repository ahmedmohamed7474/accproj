import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/authContext";

const TaskList = ({ tasks, handleTaskClick, handleCompleteTask }) => (
  <div className="space-y-4">
    {tasks.length === 0 ? (
      <p className="text-center text-gray-600">لا توجد مهام حتى الآن.</p>
    ) : (
      tasks.map((task) => (
        <div key={task.id} className="p-4 border rounded-lg bg-white shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">{task.clientName}</h3>
              <p className="text-sm text-gray-600">📋 النوع: {task.type}</p>
              <p className="text-sm text-gray-600">📞 الهاتف: {task.clientPhone}</p>
            </div>
            <div className="flex gap-2">
              <span
                className={`px-3 py-1 rounded-full text-sm ${
                  task.status === "PENDING"
                    ? "bg-yellow-100 text-yellow-800"
                    : task.status === "IN_PROGRESS"
                    ? "bg-blue-100 text-blue-800"
                    : "bg-green-100 text-green-800"
                }`}
              >
                {task.status === "PENDING"
                  ? "قيد الانتظار"
                  : task.status === "IN_PROGRESS"
                  ? "قيد التنفيذ"
                  : "مكتمل"}
              </span>
              {task.status !== "COMPLETED" && (
                <>
                  <button
                    onClick={() => handleTaskClick(task)}
                    className="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700 transition"
                  >
                    ادخال بيانات المهمة
                  </button>
                  <button
                    onClick={() => handleCompleteTask(task.id)}
                    className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 transition"
                  >
                    إتمام المهمة
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      ))
    )}
  </div>
);

const EmployeeDashboard = () => {
  const { user, loading: authLoading } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (user?.id) {
      fetchTasks(user.id);
    }
  }, [user]);

  useEffect(() => {
    const completedTaskId = location.state?.completedTaskId;
    if (completedTaskId && user?.id) {
      updateTaskStatus(completedTaskId);
    }
  }, [location.state, user]);

  const fetchTasks = async (employeeId) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`http://localhost:3002/api/v1/tasks/employees/${employeeId}`);
      setTasks(response.data.data || []);
    } catch (error) {
      setError("فشل تحميل المهام. حاول مرة أخرى لاحقًا.");
    } finally {
      setLoading(false);
    }
  };

  const updateTaskStatus = async (taskId) => {
    try {
      await axios.put(`http://localhost:3002/api/v1/tasks/${taskId}`, {
        status: "COMPLETED",
      });
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === taskId ? { ...task, status: "COMPLETED" } : task
        )
      );
      if (user?.id) {
        fetchTasks(user.id);
      }
    } catch (error) {
      setError("فشل تحديث حالة المهمة. حاول مرة أخرى لاحقًا.");
    }
  };

  const checkTaskDataExists = async (taskId) => {
    try {
      const response = await axios.get(`http://localhost:3002/api/v1/tasks/checkdata/${taskId}`);
      console.log("Check data response:", response.data);
      return response.data.data?.exists || false;
    } catch (error) {
      console.error("Error checking task data:", error);
      setError("فشل التحقق من بيانات المهمة. حاول مرة أخرى لاحقًا.");
      return false;
    }
  };
  const handleCompleteTask = async (taskId) => {
    setError(null); // Clear any previous errors
    
    // Check if task data exists
    const taskDataExists = await checkTaskDataExists(taskId);

    if (!taskDataExists) {
      setError("لا يوجد بيانات مسجلة لهذه المعاملة");
      return;
    }

    // Proceed with task completion
    setSelectedTaskId(taskId);
    setShowConfirmationModal(true);
  };

  const confirmTaskCompletion = async () => {
    if (!selectedTaskId) return;

    try {
      await axios.put(`http://localhost:3002/api/v1/tasks/${selectedTaskId}`, {
        status: "COMPLETED",
      });

      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === selectedTaskId ? { ...task, status: "COMPLETED" } : task
        )
      );

      setShowConfirmationModal(false);
      setSelectedTaskId(null);
    } catch (error) {
      setError("فشل تحديث حالة المهمة. حاول مرة أخرى لاحقًا.");
    }
  };

  const handleTaskClick = (task) => {
    if (!user?.id) return;

    // Determine the form route based on the task type
    let formRoute = "/";
    switch (task.type) {
      case "ض.ق.م":
        formRoute = "/vat";
        break;
      case "السجل التجاري":
        formRoute = "/commercial-register";
        break;
      case "ف.ك":
        formRoute = "/electronic-bill";
        break;
      case "ض.ع":
        formRoute = "/public-tax";
        break;
      default:
        formRoute = "/other-form"; // Route to the new form for other types
    }

    // Pass taskId, employeeId, and companyId to the form
    navigate(formRoute, {
      state: {
        taskId: task.id,
        employeeId: user.id,
        companyId: task.companyId,
      },
    });
  };

  // Sort tasks: PENDING first, then COMPLETED
  const sortedTasks = tasks.sort((a, b) => {
    if (a.status === "PENDING" && b.status !== "PENDING") return -1;
    if (a.status !== "PENDING" && b.status === "PENDING") return 1;
    return 0;
  });

  if (authLoading || loading) {
    return <p className="text-center text-gray-600">جاري تحميل البيانات...</p>;
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="mb-6 p-4 bg-red-100 text-red-700 rounded">{error}</div>
        <TaskList tasks={sortedTasks} handleTaskClick={handleTaskClick} handleCompleteTask={handleCompleteTask} />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      {error && <div className="mb-6 p-4 bg-red-100 text-red-700 rounded">{error}</div>}
      <div className="mb-6 p-4 bg-yellow-100 text-yellow-700 rounded">
        لديك {tasks.filter((t) => t.status === "PENDING").length} مهام قيد الانتظار تحتاج إلى انتباهك.
      </div>
      <TaskList tasks={sortedTasks} handleTaskClick={handleTaskClick} handleCompleteTask={handleCompleteTask} />
      {/* Confirmation Modal */}
      {showConfirmationModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h3 className="font-medium text-lg mb-4">تأكيد إتمام المهمة</h3>
            <p className="text-gray-600 mb-6">هل أنت متأكد أنك تريد إتمام هذه المهمة؟</p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowConfirmationModal(false)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition"
              >
                إلغاء
              </button>
              <button
                onClick={confirmTaskCompletion}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
              >
                تأكيد
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeDashboard;