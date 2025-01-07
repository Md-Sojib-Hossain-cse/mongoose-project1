import mongoose from 'mongoose';
import { TErrorSource, TGenericErrorResponse } from '../interface/error';

const handleCastError = (
  error: mongoose.Error.CastError,
): TGenericErrorResponse => {
  const statusCode = 400;
  const message = 'Invalid Id';

  const errorSources: TErrorSource = [
    {
      path: error.path,
      message: error.message,
    },
  ];
  return {
    statusCode,
    message,
    errorSources,
  };
};

export default handleCastError;
