console.log('inside printenv');
console.log(JSON.stringify(process.env));
console.log('SHIPPABLE : ' + process.env.SHIPPABLE);
console.log(!!process.env.SHIPPABLE);
console.log(!process.env.SHIPPABLE);
