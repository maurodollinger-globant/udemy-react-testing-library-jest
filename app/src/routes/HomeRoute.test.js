import { render, screen } from "@testing-library/react";
import { setupServer } from 'msw/node';
import { rest} from 'msw';
import { MemoryRouter } from "react-router";
import HomeRoute from './HomeRoute';
import { createServer } from "../test/server";

createServer([
    {
        path: '/api/repositories',
        method: 'get',
        res: (req) => {
            const language = req.url.searchParams.get('q').split('language:')[1];
            return {
                items: [
                    { id:1, full_name: `${language}_one`},
                    { id:2, full_name: `${language}_two`}
                ]
            }
        }
    }
])

test('renders two links for each table', async ()=>{
    render(
        <MemoryRouter>
            <HomeRoute/>
        </MemoryRouter>
    );

    const languages = [
        'javascript',
        'typescript',
        'python',
        'rust',
        'go',
        'java'
    ]

    for(let language of languages){
        const links = await screen.findAllByRole('link',{
            name: new RegExp(`${language}_`)
        });

        expect(links).toHaveLength(2);
        expect(links[0]).toHaveTextContent(`${language}_one`);
        expect(links[1]).toHaveTextContent(`${language}_two`);
        expect(links[0]).toHaveAttribute('href',`/repositories/${language}_one`)
        expect(links[1]).toHaveAttribute('href',`/repositories/${language}_two`)
    }

    // Loop over each language 
    // For each language, make sure we see two links
    // Assert that the links have the appropiate info

});

const pause = () => new Promise(resolve => {
    setTimeout(resolve,100);
})