function add(a,b)
{
    return a + b;
}

function subtract(a, b)
{
    return a - b;
}

module.exports = { //this how we can export multiple thing where Math is the name of the module and we sending object consist of add and sub method
    add,
    subtract
};
