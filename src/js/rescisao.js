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

let descontoTotal = 0;

function feriasProporcionais(salarioBruto, mesesTrabalhados) {
    return  salarioBruto * mesesTrabalhados / 12;
}

function umTerçoFerias(feriasProporcionais) {
    return feriasProporcionais / 3;
}

function decimoTerceiroProporcional(salarioBruto, mesesTrabalhados) {
    return salarioBruto / 12 * mesesTrabalhados;
}

function verbasRescisoria(feriasProporcionais, umTerçoFerias, decimoTerceiroProporcional) {
    return feriasProporcionais + umTerçoFerias + decimoTerceiroProporcional;
}












// FUNÇÃO INSS
function inss(salarioBruto) {
    let inss = 0;

    if (salarioBruto > 0) {
        if (salarioBruto <= 1302) {
            aliquotaInssTabela.innerHTML = `7.5%`;
            inss = salarioBruto * 0.075;
        } else if (salarioBruto <= 2571.29) {
            aliquotaInssTabela.innerHTML = `9%`;
            inss = salarioBruto * 0.09;
        } else if (salarioBruto <= 3856.94) {
            aliquotaInssTabela.innerHTML = `12%`;
            inss = salarioBruto * 0.12;
        } else if (salarioBruto <= 7507.49) {
            aliquotaInssTabela.innerHTML = `14%`;
            inss = salarioBruto * 0.14;
        } else {
            aliquotaInssTabela.innerHTML = `TETO`;
            inss = 876.97;
        }
    }

    descontoTotal += inss;
    return inss;
}

// FUNÇÃO IRRF
function irrf(base, dependentes) {
    //  PARA NÃO RETORNAR NAN QUANDO SUBTRAIR POR 0
    const verificaIndependentes = (base, dependentes) => {
        if (dependentes > 0) {
            return base - (dependentes * 189.59);
        } else {
            return base;
        }
    }

    const baseIrrf = verificaIndependentes(base, dependentes)
    let irrf = 0;

    if (baseIrrf < 1903.98) {
        aliquotaIrffTabela.innerHTML = `ISENTO`;
        irrf = 0;
    } else if (baseIrrf <= 2826.65) {
        aliquotaIrffTabela.innerHTML = `7.5%`;
        irrf = baseIrrf * 0.075;
    } else if (baseIrrf <= 3751.05) {
        aliquotaIrffTabela.innerHTML = `15%`;
        irrf = baseIrrf * 0.15;
    } else if (baseIrrf <= 4664.68) {
        aliquotaIrffTabela.innerHTML = `22.5%`;
        irrf = baseIrrf * 0.225;
    }
    else {
        aliquotaIrffTabela.innerHTML = `27.5%`;
        irrf = baseIrrf * 0.275
    }

    descontoTotal += irrf;
    return [baseIrrf - irrf, irrf];
}

// FUNCTION MAIN DO PROGRAMA
function calcular() {
    tabela.classList.remove("d-none")
    divisor.classList.remove("d-none")
    descontoTotal = 0;
    const salarioBruto = parseFloat(document.getElementById("salario-bruto_input").value);
    const meses = parseFloat(document.getElementById("meses_input").value);

// VERBAS RESCISÓRIAS
    const feriasProp = feriasProporcionais(salarioBruto, meses);
    const tercoFerias = umTerçoFerias(feriasProp);
    const decTerceiro = decimoTerceiroProporcional(salarioBruto, meses)
    const verbas = verbasRescisoria(feriasProp, tercoFerias, decTerceiro)

//  DEDUÇÕES
    const inssDecTerceiro = inss(decTerceiro)
    console.log(inssDecTerceiro)

    // FGTS




    // TABELA
    
}

// LIMPAR CAMPOS e TABELA
function limpar() {
    tabela.classList.add("d-none")
    divisor.classList.add("d-none")
    // CAMPOS
    document.getElementById("salario-bruto_input").value = "";
    document.getElementById("dependetes_input").value = "";

    // TABELA
    descontosInssTabela.innerHTML = "-";
    descontosIrrfTabela.innerHTML = "-";
    salarioLiquidoTabela.innerHTML = "-";
    proventosTotaisTabela.innerHTML = "-";
    proventosSalarioBrutoTabela.innerHTML = "-";
    descontosTotaisTabela.innerHTML = "-";
    aliquotaInssTabela.innerHTML = "-";
    aliquotaIrffTabela.innerHTML = "-";
}

// BOTAO CALCULAR
btnCalcular.addEventListener('click', calcular);

// BOTÃO LIMPAR
btnLimpar.addEventListener('click', limpar);