import glob from 'tiny-glob';

export async function getSpecFiles(arg: string) {

    return glob(arg);

}
