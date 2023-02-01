import {useState, useEffect} from 'react'

import styles from './ProjectForm.module.css'

import Input from '../form/Input.js'
import Select from '../form/Select.js'
import SubmitButton from '../form/SubmitButton'

function ProjectForm({ handleSubmit, projectData, btnText }){

  const [categories, setCategories] = useState([])
  const [project, setProject] = useState(projectData || {})

  useEffect(() => {
    fetch("http://localhost:5000/categories" , {
    method: "GET",
    headers: {
      'Content-type' : 'application/json'
    }
  }).then((resp) => resp.json())
    .then((data) => {
      setCategories(data)
    })
    .catch(err => console.log(err))
  }, [])

  const submit= (e) => {
    e.preventDefault()
    //console.log(project)
    handleSubmit(project)
  }

  function handleChange(e){
    setProject({ ...project,[e.target.name]: e.target.value })
  }

  function handleCategory(e){
    setProject({ 
        ...project,
        category: {
        id: e.target.value,
        name: e.target.options[e.target.selectedIndex].text,
      },
    })
  }

    return(
        <form onSubmit={submit} className={styles.form}>
          <Input 
            type='text' 
            text='Nome do projeto:' 
            placeholder='Insira o nome do projeto' 
            name='name'  
            handleOnChange={handleChange}
            value={project.name ? project.name: ''}
          />
            <Input 
                type='number'
                text='Orçamento do projeto:'
                name='budget'
                placeholder='Insira o valor total do orçamento'
                handleOnChange={handleChange}
                value={project.budget ? project.budget: ''}
            />
            <Select 
              name="category_id" 
              text="Selecione a categoria:" 
              options={categories}
              handleOnChange={handleCategory}
              value={project.category ? project.category.id : ''} //if ternário
              />           
           <SubmitButton text={btnText}/>
        </form>
    )   
}

export default ProjectForm