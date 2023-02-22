exports.getAvatarName = (name) => {
    const arr = name.split(' ')
    return `${arr[0][0]}${arr[1][0]}`
}


exports.getBGColor = (name, players) => {
    const team = players.filter(pl => pl.name === name)[0].team
    if (team === 'England') return '#15295e'
    if (team === 'Australia') return '#00843D'
}




exports.checkRoundComplete = (guesses, data, round) => {
    const questions = data.filter(d => d.slug === round)
    console.log(questions)
    Object.keys(guesses)
    // let difference = arr1.filter(x => !arr2.includes(x));
    const missing = questions.filter(q => !Object.keys(guesses).includes(q.name))
    console.log(missing)
}   