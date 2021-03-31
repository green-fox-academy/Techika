export default {
  default: (err, res) => {
    if (err) {
      console.error(`Cannot retrieve data: ${err.toString()}`);
      res.status(500).send(err.toString());
      return true;
    }
    return false;
  },
};
