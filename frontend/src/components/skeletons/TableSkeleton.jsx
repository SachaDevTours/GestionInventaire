    import React from 'react';

const TableSkeleton = ({ rows = 4 }) => {
    return (
        <div className="overflow-x-auto rounded-lg">
            <table className="w-full border-separate border-spacing-y-2">
                <thead>
                <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-primary bg-background-secondary rounded-l-lg">
                        Nom du Produit
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-primary bg-background-secondary">
                        Adresse MAC
                    </th>
                    <th className="px-6 py-3 text-center text-sm font-semibold text-primary bg-background-secondary rounded-r-lg">
                        QR Code
                    </th>
                </tr>
                </thead>
                <tbody>
                {Array(rows).fill(null).map((_, index) => (
                    <tr key={index}>
                        <td className="px-6 py-4 text-sm bg-background-secondary rounded-l-lg">
                            <div className="h-4 bg-gray-400 rounded animate-pulse"></div>
                        </td>
                        <td className="px-6 py-4 text-sm bg-background-secondary">
                            <div className="h-4 bg-gray-400 rounded animate-pulse"></div>
                        </td>
                        <td className="px-6 py-4 text-center bg-background-secondary rounded-r-lg">
                            <div className="h-8 w-20 mx-auto bg-gray-400 rounded animate-pulse"></div>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default TableSkeleton;