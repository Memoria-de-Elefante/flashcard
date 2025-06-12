from src.servicos.autenticacao import Autenticacao
from src.repositorio.repositorio_falso import RepositorioFalso


def test_cadastrar_usuario_com_dados_validos():
    repo = RepositorioFalso()
    auth = Autenticacao(repo)
    resultado = auth.cadastrar("Maria", "maria@email.com", "senha123")
    assert resultado == "Usuário cadastrado com sucesso"


def test_cadastrar_usuario_com_email_existente():
    repo = RepositorioFalso()
    auth = Autenticacao(repo)
    auth.cadastrar("João", "joao@email.com", "123456")
    resultado = auth.cadastrar("João", "joao@email.com", "outrasenha")
    assert resultado == "E-mail já cadastrado"


def test_login_com_credenciais_validas():
    repo = RepositorioFalso()
    auth = Autenticacao(repo)
    auth.cadastrar("Ana", "ana@email.com", "senha456")
    resultado = auth.login("ana@email.com", "senha456")
    assert resultado == "Login realizado com sucesso"


def test_login_com_email_invalido():
    repo = RepositorioFalso()
    auth = Autenticacao(repo)
    resultado = auth.login("inexistente@email.com", "123")
    assert resultado == "Usuário não encontrado"


def test_login_com_senha_errada():
    repo = RepositorioFalso()
    auth = Autenticacao(repo)
    auth.cadastrar("Carlos", "carlos@email.com", "minhasenha")
    resultado = auth.login("carlos@email.com", "errada")
    assert resultado == "Senha incorreta"


def test_campos_obrigatorios():
    repo = RepositorioFalso()
    auth = Autenticacao(repo)
    resultado = auth.cadastrar("", "novo@email.com", "123")
    assert resultado == "Todos os campos são obrigatórios"


def test_editar_usuario_existente():
    repo = RepositorioFalso()
    auth = Autenticacao(repo)
    auth.cadastrar("Paulo", "paulo@email.com", "abc123")
    resultado = auth.editar_usuario("paulo@email.com", {"nome": "Paulo Silva"})
    assert resultado == "Usuário atualizado com sucesso"


def test_editar_usuario_inexistente():
    repo = RepositorioFalso()
    auth = Autenticacao(repo)
    resultado = auth.editar_usuario("naoexiste@email.com", {"nome": "Novo Nome"})
    assert resultado == "Usuário não encontrado"


def test_excluir_usuario_existente():
    repo = RepositorioFalso()
    auth = Autenticacao(repo)
    auth.cadastrar("Luis", "luis@email.com", "senha")
    resultado = auth.excluir_usuario("luis@email.com")
    assert resultado == "Usuário excluído com sucesso"


def test_excluir_usuario_inexistente():
    repo = RepositorioFalso()
    auth = Autenticacao(repo)
    resultado = auth.excluir_usuario("fantasma@email.com")
    assert resultado == "Usuário não encontrado"