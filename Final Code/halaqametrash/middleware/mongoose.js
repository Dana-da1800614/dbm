import mongoose from 'mongoose';

const connectMongo = async () => {
  if (!mongoose.connections[0].readyState) {
    mongoose.connect(
      'mongodb://localhost:27017/halaqa?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false',
      {
        useNewUrlParser: true,
      }
    );
  }
};

export default connectMongo;
