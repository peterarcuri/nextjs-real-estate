import mongoose from "mongoose";

let initialized = false;

export const connect = async () => {
    mongoose.set('strictQuery', true);

    if (initialized) {
        console.log('MongoDb already connected');;
        return;    
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: 'RealEstate', 
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    } catch (error) {
        console.log('MongoDb connection error', error);
    } finally {
        initialized = true;
        console.log({
        message: 'MongoDb connected',
    })
    }
}