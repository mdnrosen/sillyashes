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
    const answered = Object.keys(guesses)
    const matches = questions.filter(q => answered.includes(q.name))
    const length = questions.length
    if (matches.length === length) {
        return true
    } else {
        return false
    }

}   