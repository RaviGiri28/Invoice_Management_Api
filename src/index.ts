import 'reflect-metadata';
import app from './app';
import { AppDataSource } from './data-source';
import { ENV } from './config/env';

AppDataSource.initialize().then(()=>{
    console.log('Database connected Successfully');
    
    app.listen(ENV.PORT, ()=>{
        console.log(`Server is running on port ${ENV.PORT}`);
    });
}).catch((error)=>{
    console.log('Database connection failed', error);
});