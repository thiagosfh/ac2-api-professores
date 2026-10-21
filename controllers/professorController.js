
let professores = [
    {
        id: 1,
        nome: "Thiago Silva Feitosa",
        idade: 20,
        departamento: "Tecnologia",
        turmas: [
            {
                codigo: "N1",
                disciplina: "Desenvolvimento Web",
                alunos: 30
            }
        ]
    },
    {
        id: 2,
        nome: "Maria Oliveira",
        idade: 35,
        departamento: "Biomedicina",
        turmas: [
            {
                codigo: "N2",
                disciplina: "Células",
                alunos: 25
            }
        ]
    },
    {
        id: 3,
        nome: "Carlos Santos",
        idade: 40,
        departamento: "Tecnologia",
        turmas: []
    }
];

// Listar todos os professores
function listarProfessores(req, res) {
    res.json(professores);
}

// Buscar professor por ID
function buscarProfessor(req, res) {
    const id = Number(req.params.id);

    const professor = professores.find(p => p.id === id);

    if (!professor) {
        return res.status(404).json({ mensagem: "Id não existente" });
    }

    res.json(professor);
}

// Listar turmas de um professor
function listarTurmas(req, res) {
    const id = Number(req.params.id);

    const professor = professores.find(p => p.id === id);

    if (!professor) {
        return res.status(404).json({ mensagem: "Id não existente" });
    }

    res.json(professor.turmas);
}

// Atualizar dados do professor
function atualizarProfessor(req, res) {
    const id = Number(req.params.id);

    const professor = professores.find(p => p.id === id);

    if (!professor) {
        return res.status(404).json({ mensagem: "Id não existente" });
    }

    const { nome, idade, departamento } = req.body;

    if (nome !== undefined) professor.nome = nome;
    if (idade !== undefined) professor.idade = idade;
    if (departamento !== undefined) {
        professor.departamento = departamento;
    }

    res.json({
        mensagem: "Professor atualizado com sucesso",
        professor
    });
}

// Adicionar turma a um professor
function adicionarTurma(req, res) {
    const id = Number(req.params.id);

    const professor = professores.find(p => p.id === id);

    if (!professor) {
        return res.status(404).json({ mensagem: "Id não existente" });
    }

    const { codigo, disciplina, alunos } = req.body;

    if (!codigo || !disciplina || !Number.isInteger(alunos) || alunos < 0) {
        return res.status(400).json({
            mensagem: "Informe codigo, disciplina e alunos (numero inteiro)"
        });
    }

    const turma = { codigo, disciplina, alunos };

    professor.turmas.push(turma);

    res.status(201).json({
        mensagem: "Turma adicionada com sucesso",
        turma
    });
}

// Listar professores por departamento
function listarPorDepartamento(req, res) {
    const departamento = req.params.departamento.toLowerCase();

    const resultado = professores.filter(
        p => p.departamento.toLowerCase() === departamento
    );

    res.json(resultado);
}

// Excluir professor
function excluirProfessor(req, res) {
    const id = Number(req.params.id);

    const indice = professores.findIndex(p => p.id === id);

    if (indice === -1) {
        return res.status(404).json({ mensagem: "Id não existente" });
    }

    professores.splice(indice, 1);

    res.json({ mensagem: "Professor removido com sucesso" });
}

module.exports = {
    listarProfessores,
    buscarProfessor,
    listarTurmas,
    atualizarProfessor,
    adicionarTurma,
    listarPorDepartamento,
    excluirProfessor
};
