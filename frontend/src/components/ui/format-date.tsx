const FormatDate = (data: string | number, typeFormat: string) => {
  if (typeFormat == 'dd/mm/yyyy às hh:mm:ss') {
    // Criar um objeto Date a partir da string
    const date = new Date(data);

    // Extrair os componentes da data
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');

    // Formatar a data e hora
    const formattedDate = `${day}/${month}/${year}`;
    const formattedTime = `${hours}:${minutes}:${seconds}`;

    // Retornar a data formatada
    return `${formattedDate} às ${formattedTime}`;
  } else if (typeFormat == 'mm-yyyy') {
    // Criar um objeto Date a partir da string
    const date = new Date(data);

    // Extrair os componentes da data
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();

    // Formatar a data e hora
    const formattedDate = `${month}-${year}`;

    // Retornar a data formatada
    return `${formattedDate}`;
  } else if (typeFormat == 'yyyy-mm') {
    // Criar um objeto Date a partir da string
    const date = new Date(data);

    // Extrair os componentes da data
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();

    // Formatar a data e hora
    const formattedDate = `${year}-${month}`;

    // Retornar a data formatada
    return `${formattedDate}`;
  } else if (typeFormat == 'yyyy-mm-dd') {
    // Criar um objeto Date a partir da string
    const date = new Date(data);

    // Extrair os componentes da data
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();

    // Formatar a data e hora
    const formattedDate = `${year}-${month}-${day}`;

    // Retornar a data formatada
    return `${formattedDate}`;
  } else if (typeFormat == 'hh:mm:ss') {
    // Criar um objeto Date a partir da string
    const date = new Date(data);

    // Extrair os componentes da hora
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    // Retornar a hora formatada
    return `${hours}:${minutes}:${seconds}`;
  } else {
    return data;
  }
};

export default FormatDate;
