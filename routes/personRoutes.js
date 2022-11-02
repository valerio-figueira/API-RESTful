const router = require('express').Router();
const Person = require('../models/Person');

// CREATE
router.post('/', async (req, res) => {
    // req.body
    // {name: "Valerio", salary = 2000, approved = true}
    // DESTRUCTURING ARRAY...
    const {name, salary, approved} = req.body;

    if(!name){
        res.status(422).json({ error: 'O nome é obrigatório' });
        return;
    };

    const person = {
        name,
        salary,
        approved
    };

    // Create method (Mongoose)
    try{
        await Person.create(person);

        res.status(201).json({message: 'Pessoa cadastrada com sucesso'});

    } catch(error){
        res.status(500).json({error: error});
    };
});


// READ
router.get('/', async (req, res) => {
    try{
        // find method will return all dates from collection (MongoDb)
        const people = await Person.find();

        res.status(200).json(people);

    } catch(error){
        res.status(500).json({ error: error });
    }
});

//  RESGATAR PESSOA ÚNICA
router.get('/:id', async (req, res) => {
    // extrair o dado da requisição
    // quando o dado vem pela url, ele é extraído pela req.params
    const id = req.params.id;

    //console.log(req)

    try{
        await Person.findOne({_id: id})
        .then((person) => {
            if(!person){
                res.status(422).json({message: 'O usuário não foi encontrado.'});
                return;
            }

            res.status(200).json(person);
        }).catch(error => {
            res.status(500).json({message: 'O usuário não foi encontrado. Status error: ' + error});
            return;
        })
        
    } catch(error){
        res.status(500).json({ error: error });
    };
});

// Update - atualização de dados (PUT, PATCH)
// O PUT MANDA UM OBJETO COMPLETO PARA ATUALIZAR O SISTEMA
// O PATCH ATUALIZA UM CAMPO INDIVIDUAL, É UM TIPO DE ATUALIZAÇÃO PARCIAL
router.patch('/:id', async (req, res) => {
    const id = req.params.id;
    const {name, salary, approved} = req.body;

    const person = {
        name,
        salary,
        approved
    };

    try{
        
        await Person.updateOne({_id: id}, person)
        .then((person) => {
            if(!person){
                res.status(422).json({message: 'O usuário não foi encontrado.'});
                return;
            }
            res.status(200).json(person);
        }).catch((error) => {
            res.status(500).json({message: 'O usuário não foi encontrado. Status error: ' + error});
            return;
        });

    } catch(error){
        res.status(500).json({ error: error })
    };

});

// DELETE
router.delete('/:id', async (req, res) => {
    const id = req.params.id;

    try{
        await Person.deleteOne({_id: id})
        .then((person) => {
            if(!person){
                res.status(422).json({message: 'O usuário não foi encontrado.'});
                return;
            }

            res.status(200).json({message: `Usuário removido com sucesso!`});
        }).catch(error => {
            res.status(500).json({message: 'O usuário não foi encontrado. Status error: ' + error});
            return;
        })
    } catch(error){
        res.status(500).json({ error: error });
    };
});

module.exports = router;