const fs = require('fs');

const lerArquivo = (): unknown => {
    return JSON.parse(fs.readFileSync('./bd.json'));
};

const escreverArquivo = (dados: any): void => {
    fs.writeFileSync('./bd.json', JSON.stringify(dados));
};

type Endereco = {
    cep: string,
    rua: string,
    complemento?: string,
    bairro: string,
    cidade: string
};

type Usuario = {
    nome: string,
    email: string,
    cpf: string,
    profissao?: string,
    endereco:Endereco | null;
};

const cadrasUsuario = (dados: Usuario): Usuario => {
    const bd = lerArquivo() as Usuario[];
    bd.push(dados);
    escreverArquivo(bd);
    return dados;
};

const listarUsuarios = (filtro?: string): Usuario[] => {
    const bd = lerArquivo() as Usuario[];

    const usuarios = bd.filter(usuario => {
        if(filtro){
            return usuario.profissao === filtro;
        }
        return usuario;
    });

    return usuarios;
};

const detalharUsuario = (cpf: string): Usuario => {
    const bd = lerArquivo() as Usuario[];
    const usuario = bd.find(usuario => {
        return usuario.cpf === cpf
    });

    if (!usuario) {
        throw new Error('Usuário não encontrado');
    };
    
    return usuario;
};

const atualizarUsuario = (cpf: string, dados: Usuario) => {
    const bd = lerArquivo() as Usuario[];
    const usuario = bd.find(usuario => {
        return usuario.cpf === cpf
    });

    if (!usuario) {
        throw new Error('Usuário não encontrado');
    };

    Object.assign(usuario, dados);

    escreverArquivo(bd);

    return dados;
};

const deletarUsuario = (cpf: string): Usuario => {
    const bd = lerArquivo() as Usuario[];
    const usuarios = bd.find(usuario => {
        return usuario.cpf === cpf
    });

    if (!usuarios) {
        throw new Error('Usuário não encontrado');
    }

    const exclusao = bd.filter(usuario => {
        return usuario.cpf !== cpf
    });

    escreverArquivo(exclusao);

    return usuarios;
};

const weslen = cadrasUsuario({
     nome: 'Weslen',
     email: 'weslen@email.com',
     cpf: '12345678900',
     endereco: {
         cep: '12345678',
        rua: 'Rua teste',
         bairro: 'Bairro teste',
         cidade: 'Cidade teste'
     }
});

const igor = cadrasUsuario({
    nome: 'Igor',
    email: 'Igor@email.com',
    cpf: '12345678901',
    endereco: {
        cep: '12345678',
       rua: 'Rua A',
        bairro: 'Bairro B',
        cidade: 'Cidade C'
    }
});

const jonas = cadrasUsuario({
    nome: 'Jonas',
    email: 'Jonas@email.com',
    cpf: '12345678902',
    endereco: {
        cep: '12345678',
       rua: 'Rua teste',
        bairro: 'Bairro teste',
        cidade: 'Cidade teste'
    }
});

const natan = cadrasUsuario({
    nome: 'Natan',
    email: 'Natan@email.com',
    cpf: '12345678902',
    profissao: 'Desenvolvedor',
    endereco: {
        cep: '12345678',
       rua: 'Rua teste',
        bairro: 'Bairro teste',
        cidade: 'Cidade teste'
    }
});
// atualizarUsuario('12345678900', {
//     nome: 'Weslen',
//     email: 'wa@email.com',
//     cpf: '12345678900',
//     profissao: 'Desenvolvedor',
//     endereco: {
//         cep: '12345678',
//         rua: 'Rua a',
//         bairro: 'Bairro b',
//         cidade: 'Cidade c'
//     }
// });

//const weslen = detalharUsuario('12345678900');

//console.log(deletarUsuario('12345678900'), '\n');

// const bd = lerArquivo();

const bd = listarUsuarios('Desenvolvedor');
console.log(bd);