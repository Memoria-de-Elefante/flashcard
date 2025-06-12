class Autenticacao:
    def __init__(self, repositorio):
        self.repositorio = repositorio

    def cadastrar(self, nome, email, senha):
        if not nome or not email or not senha:
            return "Todos os campos são obrigatórios"
        if self.repositorio.encontrar_por_email(email):
            return "E-mail já cadastrado"
        usuario = {"nome": nome, "email": email, "senha": senha}
        self.repositorio.salvar(usuario)
        return "Usuário cadastrado com sucesso"

    def login(self, email, senha):
        usuario = self.repositorio.encontrar_por_email(email)
        if not usuario:
            return "Usuário não encontrado"
        if usuario["senha"] != senha:
            return "Senha incorreta"
        return "Login realizado com sucesso"

    def editar_usuario(self, email, novos_dados):
        if not self.repositorio.editar(email, novos_dados):
            return "Usuário não encontrado"
        return "Usuário atualizado com sucesso"

    def excluir_usuario(self, email):
        if not self.repositorio.excluir(email):
            return "Usuário não encontrado"
        return "Usuário excluído com sucesso"