import APP from './app';

const PORT = process.env.PORT || 3000;

APP.listen(PORT, () => {
  console.log(`server at port ${PORT}`)
});
