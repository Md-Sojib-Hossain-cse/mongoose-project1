import { TErrorSource, TGenericErrorResponse } from '../interface/error';

const handleDuplicateError = (error: any): TGenericErrorResponse => {
  const statusCode = 400;
  const errorSources: TErrorSource = [
    {
      path: Object.keys(error?.keyValue)[0],
      message: `${error.keyValue[Object.keys(error?.keyValue)[0]]} is already Exist`,
    },
  ];
  return {
    statusCode,
    message: 'Duplicate Error',
    errorSources: errorSources,
  };
};

export default handleDuplicateError;
