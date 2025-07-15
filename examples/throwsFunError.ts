export function throwsFunError() {

    throw new Error('supercalifragilisticexpialidocious is not a function');

}

export async function throwsFunErrorAsync() {

    await new Promise((resolve) => setTimeout(resolve, 100));
    throw new Error('supercalifragilisticexpialidocious is not a function');

}
