import { json } from '@sveltejs/kit'

export const GET = async ({ params }) => {
    const { default: file }  = await import(`../../lib/${params.file}.js`)
    return json(file)
}