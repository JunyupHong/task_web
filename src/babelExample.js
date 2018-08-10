function Element() {}
const ele = new Element();

function wait(ms) {
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve(), ms);
    })
}

async function t() {
    await wait(1000);
}

t();

const a = 0;

const b = 0;