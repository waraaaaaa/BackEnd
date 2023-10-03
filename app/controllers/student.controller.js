const db = require("../model");
const Student = db.students;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    if(!req.body.Name){
        res.status(400).send({
            message: "Content connot be empty"
        })
        return;
    }

    const student = {
        id: req.body.id,
        Name: req.body.Name,
        Surname: req.body.Surname,
        University: req.body.University,
        Graduation: req.body.Graduation ? req.body.Graduation : false
    }

    Student.create(student)
    .then(data => {
        res.send({data})
    })
    .catch(err => {
        res.status(500).send({
            message: "Error 500!"
        })
    });
};

exports.findAll = (req, res) => { 
    const Name = req.body.Name;
    var condition = Name ? {Name: {[Op.like]: `%${Name}%`}} : null;

    Student.findAll({where : condition})
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred!"
            })
        });
};

exports.findOne = (req, res) => {
    const id = req.params.id;
    Student.findByPk(id)
        .then(data => {
            if(data){
                res.send(data);
            }else{
                res.status(404).send({
                    //message: `Error 404 ${id}`
                    message: Error `Error 404 not found id ${id}`
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error 500" + id 
            })
        });
}; 

exports.findAllUniv = (req, res) => {
    Student.findAllUniv({ where: { Graduation: true }})
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error 500" 
            });
        });
};
exports.update = (req, res) => {
    const id = req.params.id;
    Student.update(req.body, { where: {id:id}})
        .then(num => {
            if(num == 1){
                res.send({
                    message: "Updated successfully"
                })
            }else{
                res.send({
                    message: "Updated failed!"
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "error update!"
            })
        }) 
} ;

exports.delete = (req, res) => {
    const id = req.params.id;
    Student.destroy({ where: {id:id}})
    .then(num => {
        if(num == 1){
            res.send({
                message: "Deleted successfilly"
            })
        }else{
            res.send({
                message: "Deleted failed!"
            })
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Error deleted 500"
        })
    })
};

exports.deleteAll = (req, res) => {
    Student.destroy({
        where: {},
        truncate: false
    })
    .then(num => {
        res.send({
            message: "Deleted succesfully"
        })
    })
    .catch(err => {
        res.status(500).send({
            message: "Error 500! "
        })
    });
};

