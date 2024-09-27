export const getCardTitleContent = (title, icon) =>  {
    return `<h4>${title} <i class="fa fa-${icon}"></i></h4>`;
};

export const getCardItemsContent = (cardFields) => {
    return cardFields.map(({field, icon, textContent }) => {
        return `<p><b><i class='fa fa-${icon}'></i> ${field}:</b> ${textContent}</p>`
    }).join('');
};

export const debounce = (callback, delay) => {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => callback.apply(this, args), delay);
    };
};
