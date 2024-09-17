import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import RepositoriesListItem from './RepositoriesListItem';

// return 
/*
jest.mock('../tree/FileIcon',()=>{
    // Content of FileIcon.js
    return () => {
        return 'File Icon Component'
    };
});*/

function renderComponent(){
    const repository = {
        full_name: 'facebook/react',
        language: 'Javascript', 
        description: 'A js library', 
        owner: {
            login:'facebook'
        }, 
        name: 'react',
        html_url: 'https://github.com/facebook/react' 
    }
    render(
        <MemoryRouter>
            <RepositoriesListItem repository={repository}/>
        </MemoryRouter>
    )

    return { repository};
}

test('shows a link to the github hompepage for this repository', ()=>{
    const {repository } = renderComponent();

   //screen.findByRole('img',{ name: 'Javascript' })

   const link = screen.getByRole('link', {
    name:/github repository/
   });
   expect(link).toHaveAttribute('href',repository.html_url);
})

test('shows a fileicon with the appropiate icon',async ()=>{
    renderComponent();

    const icon = await screen.findByRole('img', { name: 'Javascript'})
    //screen.debug();
    await pause();
    //screen.debug();
    expect(icon).toHaveClass('js-icon');

})


const pause = () => {
    return new Promise((resolve)=>{
        setTimeout(()=>{
            resolve();
        },100)
    })
}

test('shows a link to the code editor page',async()=>{
    const {repository} = renderComponent();

    await screen.findByRole('img', {name:'Javascript'});
 
    const link = await screen.findByRole('link',{
        name: new RegExp(repository.owner.login)
    }) 

    expect(link).toHaveAttribute('href',`/repositories/${repository.full_name}`)
})