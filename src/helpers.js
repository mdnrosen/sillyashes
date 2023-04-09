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

    // IVE REALLY COCKED THIS BIT UP, I THINK I NEED TO REFACTOR ALL THE ROUNDS BEFORE WE LOOK TO BUILD OUT THE SUMMARY PAGE



    // const roundLength = questions.length
    // let complete = 0
    // const keys = Object.keys(guesses)

    // for (let i = 0; i < keys.length; i++) {
    //     console.log(guesses[keys[i]].length)
    //     if (guesses[keys[i]].length) complete++
    // }

    // if (roundLength === complete) {
    //     return true
    // } else {
    //     return false
    // }

    



    // // this no doesn't work becauae we're checking keys of default state so it's always true
    // const answered = Object.keys(guesses)
 
    // const matches = questions.filter(q => answered.includes(q.name))
    // const length = questions.length
    // if (matches.length === length) {
    //     return true
    // } else {
    //     return false
    // }

}   