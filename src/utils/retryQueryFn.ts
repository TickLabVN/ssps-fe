export const retryQueryFn = (failureCount: number, error: ResponseError) => {
  if (error.statusCode === 401) window.location.pathname = '/';
  return failureCount < 3;
};
