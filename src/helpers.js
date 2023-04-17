exports.getAvatarName = (name) => {
    const arr = name.split(' ')
    return `${arr[0][0]}${arr[1][0]}`
}


exports.getBGColor = (name, players) => {
    const team = players.filter(pl => pl.name === name)[0].team
    if (team === 'England') return '#15295e'
    if (team === 'Australia') return '#00843D'
}




exports.roundComplete = (questions, guesses) => {
    // the anomoly is the bigHitters and fullStraight quetsion where the defauilt state is an object
    const g_names = Object.keys(guesses)

    // questions.forEach(q => {
    //     console.log(guesses[q.name])
    // })



    const matches = Object.keys(guesses).filter(g => questions.includes(g))
    return 'Errrr, I dunno.'
}   


exports.questionAnswered = (question, guesses) => {
    return guesses[question.name].length ? true : false
}