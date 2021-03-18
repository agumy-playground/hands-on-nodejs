async function* asyncGenerator() {
    let i = 0;
    while (i <= 3) {
        await new Promise(resolve => setTimeout(resolve, 100))
        yield i++
    }
}

const main = async () => {
    for await (const e of asyncGenerator()) {
        console.log(e)
    }
}

main()