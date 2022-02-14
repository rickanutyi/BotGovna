module.exports = {
  calc: {
    getSum(nums) {
      return nums.reduce((acc, prev) => +acc + +prev);
    },
  },
};
