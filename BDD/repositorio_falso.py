class RepositorioFalso:
    def __init__(self):
        self.usuarios = {}

    def encontrar_por_email(self, email):
        return self.usuarios.get(email)

    def salvar(self, usuario):
        self.usuarios[usuario["email"]] = usuario

    def editar(self, email, novos_dados):
        if email in self.usuarios:
            self.usuarios[email].update(novos_dados)
            return True
        return False

    def excluir(self, email):
        if email in self.usuarios:
            del self.usuarios[email]
            return True
        return False