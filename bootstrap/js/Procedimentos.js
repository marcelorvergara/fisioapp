class Procedimentos {
    constructor (idProc, procedimento, qtdMaxPAciente ) {
        this.idProc = idProc;
        this.procedimento = procedimento;
        this.qtdMaxPAciente = qtdMaxPAciente;
    }
    toString() {
        return this.idProc + ', ' + this.procedimento + ', ' + this.qtdMaxPAciente;
    }
}

// Firestore data converter
var procedimentoConverter = {
    toFirestore: function(procedimento) {
        return {
            idProc: procedimento.idProc,
            procedimento: procedimento.procedimento,
            qtdMaxPAciente: procedimento.qtdMaxPAciente
        }
    },
    fromFirestore: function(snapshot, options){
        const data = snapshot.data(options);
        return new Procedimentos(data.idProc, data.procedimento, data.qtdMaxPAciente)
    }
}