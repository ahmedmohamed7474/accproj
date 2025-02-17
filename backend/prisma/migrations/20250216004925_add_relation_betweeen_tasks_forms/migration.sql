-- AlterTable
ALTER TABLE `commercialregister` ADD COLUMN `taskId` INTEGER NULL;

-- AlterTable
ALTER TABLE `electronicbill` ADD COLUMN `taskId` INTEGER NULL;

-- AlterTable
ALTER TABLE `publictax` ADD COLUMN `taskId` INTEGER NULL;

-- AlterTable
ALTER TABLE `vat` ADD COLUMN `taskId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `VAT` ADD CONSTRAINT `VAT_taskId_fkey` FOREIGN KEY (`taskId`) REFERENCES `Task`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PublicTax` ADD CONSTRAINT `PublicTax_taskId_fkey` FOREIGN KEY (`taskId`) REFERENCES `Task`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ElectronicBill` ADD CONSTRAINT `ElectronicBill_taskId_fkey` FOREIGN KEY (`taskId`) REFERENCES `Task`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CommercialRegister` ADD CONSTRAINT `CommercialRegister_taskId_fkey` FOREIGN KEY (`taskId`) REFERENCES `Task`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
