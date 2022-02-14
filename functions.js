module.exports = {
  calc: {
    getSum(nums) {
      return nums.reduce((acc, prev) => +acc + +prev);
    },
    getDifference(nums) {
      return nums.reduce((acc, prev) => +acc - +prev);
    },
    getProduct(nums) {
      return nums.reduce((acc, prev) => +acc * +prev);
    },
    getQuotient(nums) {
      return nums.reduce((acc, prev) => +acc / +prev);
    },
  },
};
