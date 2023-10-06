// BOTOES
const btnLimpar = document.getElementById("btnLimpar");
const btnCalcular = document.getElementById("btnCalcular");

// TABELA DNONE DBLOCK
const tabela = document.getElementById("tabela");
const divisor = document.getElementById("divisor");

// COLUNA ALIQUOTA REAL
const aliquotaInssTabela = document.getElementById("aliquota_inss_tabela");
const aliquotaIrffTabela = document.getElementById("aliquota_irrf_tabela");

// COLUNA PROVENTOS
const proventosSalarioBrutoTabela = document.getElementById("proventos_salario-bruto_tabela");
const proventosTotaisTabela = document.getElementById("proventos_totais_tabela");

// COLUNA DESCONTOS
const descontosInssTabela = document.getElementById("descontos_inss_tabela");
const descontosIrrfTabela = document.getElementById("descontos_irrf-tabela");
const descontosTotaisTabela = document.getElementById("descontos_totais_tabela");

// LINHA SALARIO LIQUIDO
const salarioLiquidoTabela = document.getElementById("salario-liquido_tabela");

const feriasProporcionais = (salarioBruto, mesesTrabalhados) => {
    return  salarioBruto * mesesTrabalhados / 12;
}

const umTerçoFerias = (feriasProporcionais) => {
    return feriasProporcionais / 3;
}

const decimoTerceiroProporcional = (salarioBruto, mesesTrabalhados) => {
    return salarioBruto / 12 * mesesTrabalhados;
}

const verbasRescisoria = (feriasProporcionais, umTerçoFerias, decimoTerceiroProporcional) => {
    return feriasProporcionais + umTerçoFerias + decimoTerceiroProporcional;
}

const depositoFgts = (salarioBruto, mesesTrabalhados) => {
    return salarioBruto * 0.08 * mesesTrabalhados;
}

const multaFgts = (depositoFgts) => {
    return depositoFgts * 0.4;
}

// FUNÇÃO INSS
function inss(salarioBruto) {
    let inss = 0;

    if (salarioBruto > 0) {
        if (salarioBruto <= 1302) {
            inss = salarioBruto * 0.075;
        } else if (salarioBruto <= 2571.29) {
            inss = salarioBruto * 0.09;
        } else if (salarioBruto <= 3856.94) {
            inss = salarioBruto * 0.12;
        } else if (salarioBruto <= 7507.49) {
            inss = salarioBruto * 0.14;
        } else {
            inss = 876.97;
        }
    }

    return inss;
}

// FUNCTION MAIN DO PROGRAMA
function calcular() {
    tabela.classList.remove("d-none")
    divisor.classList.remove("d-none")

    const salarioBruto = parseFloat(document.getElementById("salario-bruto_input").value);
    const meses = parseFloat(document.getElementById("meses_input").value);

// VERBAS RESCISÓRIAS
    const feriasProp = feriasProporcionais(salarioBruto, meses);
    const tercoFerias = umTerçoFerias(feriasProp);
    const decTerceiro = decimoTerceiroProporcional(salarioBruto, meses);
    const verbas = verbasRescisoria(feriasProp, tercoFerias, decTerceiro);

//  DEDUÇÕES
    const inssDecTerceiro = inss(decTerceiro);

    // FGTS
    const deposito = depositoFgts(salarioBruto, meses);
    const multa = multaFgts(deposito);
    const totalFgts = deposito + multa;

    const rescisao = verbas + totalFgts - inssDecTerceiro;

    // TABELA
    document.getElementById("verbas_rescisorias_tabela").innerHTML = `${verbas.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`;
    document.getElementById("descontos_tabela").innerHTML = `${inssDecTerceiro.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`;
    document.getElementById("total_fgts_tabela").innerHTML = `${totalFgts.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`;
    document.getElementById("total_tabela").innerHTML = `${rescisao.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`;
}

// LIMPAR CAMPOS e TABELA
function limpar() {
    tabela.classList.add("d-none")
    divisor.classList.add("d-none")
    // CAMPOS
    document.getElementById("salario-bruto_input").value = "";
    document.getElementById("meses_input").value = "";

    // TABELA
    document.getElementById("verbas_rescisorias_tabela").innerHTML = "-";
    document.getElementById("descontos_tabela").innerHTML = "-";
    document.getElementById("total_fgts_tabela").innerHTML = "-";
    document.getElementById("total_tabela").innerHTML = "-";
}

// BOTAO CALCULAR
btnCalcular.addEventListener('click', calcular);

// BOTÃO LIMPAR
btnLimpar.addEventListener('click', limpar);