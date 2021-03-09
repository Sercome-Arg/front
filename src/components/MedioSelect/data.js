export const MediaOptions = [
    { value: 'placeholder', label: 'Selecciona una opción', isDisabled: true},
    { value: 'Facebook', label: 'Facebook'},
    { value: 'Instragram', label: 'Instragram' },
    { value: 'Twitter', label: 'Twitter' },
    { value: 'Anuncios', label: 'Anuncios' },
    { value: 'Otras', label: 'Otras' },
  ];
  
  export const otherOptions = [
    { value: 'amigo', label: 'Me contón un amigo', rating: 'safe' },
    { value: 'profeson', label: 'Me contón mi profesor', rating: 'good' },
  ];
  
  
  export const optionLength = [
    { value: 1, label: 'general' },
    {
      value: 2,
      label:
        'Evil is the moment when I lack the strength to be true to the Good that compels me.',
    },
    {
      value: 3,
      label:
        "It is now an easy matter to spell out the ethic of a truth: 'Do all that you can to persevere in that which exceeds your perseverance. Persevere in the interruption. Seize in your being that which has seized and broken you.",
    },
  ];
  
  export const dogOptions = [
    { id: 1, label: 'Chihuahua' },
    { id: 2, label: 'Bulldog' },
    { id: 3, label: 'Dachshund' },
    { id: 4, label: 'Akita' },
  ];
  
  // let bigOptions = [];
  // for (let i = 0; i < 10000; i++) {
  // 	bigOptions = bigOptions.concat(colourOptions);
  // }
  
  export const groupedOptions = [
    {
      label: 'Redes sociales',
      options: MediaOptions,
    },
    {
      label: 'Otros medios',
      options: otherOptions,
    },
  ];
  