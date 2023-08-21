const add = document.querySelector('#add')
const modalAddFeatures = document.querySelector('.modal-add')
const buttonCloseAddFeatures = document.querySelector('#close-add-features')
const buttonConfirm = document.querySelector('#buttonConfirm')
const tbody = document.querySelector('tbody')
const totalFeatures = document.querySelector('#totalFeatures')
const totalHorasDev = document.querySelector('#totalHorasDev')
const totalHorasTest = document.querySelector('#totalHorasTest')
const valorTotal = document.querySelector('#valorTotal')
const buttonExport = document.querySelector('#export')

let features = []

const calcValue = (horasDev, horasTest) => {
  const valorHora = document.querySelector('#valorHora').value
  const result = Math.floor((horasDev + horasTest) * valorHora)
  return result
}

const generateRow = (id, data) => {
  return `
    <tr class='features-table' id='${id}'>
      <td>${data.feature}</td>
      <td>${data.horasDev}h</td>
      <td>${data.horasTest}h</td>
      <td>R$ ${calcValue(data.horasDev, data.horasTest)}</td>
    </tr>
  `
}

function refreshGUI () {
  tbody.innerHTML = ''
  features.forEach((feature, i) => {
    const row = generateRow(i, feature)
    tbody.insertAdjacentHTML('beforeend', row)
  })

  totalFeatures.innerHTML = features.length
  totalHorasDev.innerHTML = features.reduce((accumulator, feature) => (accumulator += feature.horasDev), 0)
  totalHorasTest.innerHTML = features.reduce((accumulator, feature) => (accumulator += feature.horasTest), 0)
  valorTotal.innerHTML = features.reduce((accumulator, feature) => (accumulator += calcValue(feature.horasDev, feature.horasTest)), 0)
}

add.onclick = function () {
  modalAddFeatures.showModal()
}

buttonCloseAddFeatures.onclick = function () {
  modalAddFeatures.close()
}

buttonConfirm.onclick = function () {
  const valorHora = document.querySelector('#valorHora').value
  if (valorHora != '') {
    
    const formFeature = document.querySelector('#form-feature')
    const inputFeature = document.querySelector('#feature').value
    const inputHorasDev = document.querySelector('#horasDev').value
    const inputHorasTest = document.querySelector('#horasTest').value

    if (inputFeature == '' || inputHorasDev == '' || inputHorasTest == '') {
      alert('Você precisa preencher todo o formulário!')
    } else {
      let feature = {
        feature: inputFeature,
        horasDev: parseInt(inputHorasDev),
        horasTest: parseInt(inputHorasTest)
      }
  
      formFeature.reset()
  
      features.push(feature)
      refreshGUI()
      modalAddFeatures.close()
    }
  } else {
    alert('Preencha o seu valor por hora!')
    modalAddFeatures.close()
  }
}

buttonExport.onclick = function () {
  let element = document.getElementById("download")
  element.href =
    "data:text/json;charset=utf-8," +
    encodeURIComponent(JSON.stringify(features))
  element.setAttribute("download", "features.json")
  element.click()
}

refreshGUI()
