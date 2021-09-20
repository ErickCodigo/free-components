/**
 * @param {Number} totalLength
 * @param {Number} piecesLength
 * @param {Number} currentPage
 * @return {Object} Retorna la data recortada y otras herramientas útiles.
 * */
const controlPagination = (totalLength = 1, piecesLength = 1, currentPage = 1) => { // llevar
    const numberOfPages = Math.ceil(totalLength / piecesLength);
    const to = piecesLength * currentPage;
    const from = to - piecesLength;

    return {
        numberOfPages,
        ranges: {
            from,
            to: to >= totalLength ? totalLength : to
        }
    };
};

export default controlPagination;
