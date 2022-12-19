interface PaginationProps {
    totalCountOfRegisters: number;
    registersPerPage?: number;
    currentPage?: number;
    onPageChange: (page: number) => void;
}

const siblingsCount = 1;

function generatePagesArray(from: number, to: number) {
    return [...new Array(to - from)]
        .map((_, index) => {
            return from + index + 1;
        })
        .filter(page => page > 0);
}

export function Pagination({
    totalCountOfRegisters,
    registersPerPage = 10,
    currentPage = 1,
    onPageChange,
}: PaginationProps) {
    const lastPage = Math.ceil(totalCountOfRegisters / registersPerPage);

    console.log(lastPage)

    const previousPages = currentPage > 1
        ? generatePagesArray(currentPage - 1 - siblingsCount, currentPage - 1)
        : []

    const nextPages = currentPage < lastPage
        ? generatePagesArray(currentPage, Math.min(currentPage + siblingsCount, lastPage))
        : []



    return (
        <div className="flex mt-8 justify-between items-center gap-6 text-white text-xs">
            <div>
                <strong>{currentPage === 1 ? 1 : (currentPage - 1) * registersPerPage + 1}</strong> - <strong>{currentPage === lastPage ? totalCountOfRegisters : currentPage * 10}</strong> de <strong> {totalCountOfRegisters} </strong>
            </div>
            <div className="flex gap-2">

                {currentPage > (1 + siblingsCount) && (
                    <>
                        <PaginationItem numberPage={1} onPageChange={onPageChange} />
                        {currentPage > (2 + siblingsCount) && (
                            <p className="text-gray-300 text-sm text-center">...</p>
                        )}
                    </>
                )}

                {previousPages.length > 0 && previousPages.map(page => {
                    return <PaginationItem key={page} numberPage={page} onPageChange={onPageChange} />
                })}

                <PaginationItem numberPage={currentPage} onPageChange={onPageChange} isCurrent />

                {nextPages.length > 0 && nextPages.map(page => {
                    return <PaginationItem key={page} numberPage={page} onPageChange={onPageChange} />
                })}

                {currentPage < (lastPage - siblingsCount) && (
                    <>
                        {(currentPage + 1 + siblingsCount) < lastPage && (
                            <p className="text-gray-300 text-sm text-center">...</p>)}
                        <PaginationItem numberPage={lastPage} onPageChange={onPageChange} />
                    </>
                )}

            </div>
        </div>
    )
}


interface PaginationItemProps {
    numberPage: number
    isCurrent?: boolean;
    onPageChange: (page: number) => void;
}

export function PaginationItem({ numberPage, isCurrent = false, onPageChange }: PaginationItemProps) {
    if (isCurrent) {
        return (
            <button className="flex items-center justify-center w-6 h-6 text-xs bg-blue-600 rounded-sm text-white" disabled>
                {numberPage}
            </button>
        );
    }

    return (
        <button
            className="flex items-center justify-center w-6 h-6 text-xs bg-gray-700 rounded-sm text-white hover:bg-slate-600"
            onClick={() => onPageChange(numberPage)}
        >
            {numberPage}
        </button>
    );
}