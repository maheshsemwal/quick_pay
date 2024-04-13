const convertToInt = (balance) =>{
    return Math.round(balance * 100)
}

const convertToFloat = (balance) => {
    const rupees = Math.floor(balance / 100)
    const paise = balance % 100

    const finalBal = rupees + (paise/(10**(String(paise).length)));
    return finalBal 
}

module.exports = {convertToInt, convertToFloat}