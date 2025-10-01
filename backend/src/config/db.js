import mongoose from 'mongoose';

export const connectDB = async () => {
    try {

        await mongoose.connect(process.env.MONGODB_CONNECTIONSTRING);
        console.log("lien ket csdl thanh cong");

    } catch (error) {
        console.log("Loi khi ket noi csdl:", error); // In chi tiết lỗi
        process.exit(1)
    }
}