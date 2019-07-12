var valid = {
    checkEmail: function(email) {       //example
        var exp = /^\w{1,}@\w{1,}[.]\w{2,3}$/g
        if (email.match(exp) == null) {
            return false;
        }
        return true;
    },

    /*checkQuantity: function(quantity) {
        var exp = /^[0-9]*$/g
        if (quantity.match(exp) == null) {
            return false;
        }
        return true;
    },*/
};
module.exports = valid;
