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
const buttonDelete = document.querySelector('#delete')
const buttonImport = document.querySelector('#import')
const modalImportFeatures = document.querySelector('.modal-import')
const buttonCloseImportFeatures = document.querySelector('#close-import-features')
const buttonConfirmImport = document.querySelector('#buttonConfirmImport')

let features = []

const calcValue = (horasDev, horasTest) => {
  const valorHora = document.querySelector('#valorHora').value
  const result = Math.floor((horasDev + horasTest) * valorHora)
  return result
}

const generateRow = (id, data) => {
  return `
    <tr class='features-table'>
      <td>${data.feature}</td>
      <td>${data.horasDev}h</td>
      <td>${data.horasTest}h</td>
      <td>R$ ${calcValue(data.horasDev, data.horasTest)}</td>
      <td class='delete-row-hidden' id='${id}'><button class='delete-row-button'><i class="fa-solid fa-xmark" style="color: #FFFFFF;"></i></button></td>
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
  const valorHora = document.querySelector('#valorHora').value
  if (valorHora != '') {
    modalAddFeatures.showModal()
  } else {
    alert('Preencha o seu valor por hora!')
  }
}

buttonCloseAddFeatures.onclick = function () {
  modalAddFeatures.close()
}

buttonConfirm.onclick = function () {
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
}

buttonExport.onclick = function () {
  if(features.length != 0) {
    let element = document.getElementById("download")
    element.href =
      "data:text/json;charset=utf-8," +
      encodeURIComponent(JSON.stringify(features))
    element.setAttribute("download", "features.json")
    element.click()
  } else {
    alert('Você não adicionou nenhuma feature!')
  }
}

buttonDelete.onclick = function () {
  for(let id = 0; id < features.length; id++) {
    document.getElementById(`${id}`).classList.remove('delete-row-hidden')
    document.getElementById(`${id}`).classList.add('delete-row')

    document.getElementById(`${id}`).addEventListener('click', () => {
      features.splice(id, 1)
      refreshGUI()
    })
  }
}

buttonImport.onclick = function () {
  modalImportFeatures.showModal()
}

buttonCloseImportFeatures.onclick = function () {
  modalImportFeatures.close()
}

buttonConfirmImport.onclick = function () {
  const inputImport = document.querySelector('#inputImport')
  let file = inputImport.files[0];
  let reader = new FileReader();

  reader.readAsText(file);
  reader.onloadend = () => {
    let result = JSON.parse(reader.result);
    features = result;
    refreshGUI();
    modalImportFeatures.close()
  };
}

refreshGUI()
