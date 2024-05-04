import React, { useEffect } from 'react';

const AdsComponent = (props: any) => {
    const { dataAdSlot, clientId } = props; // Corrected prop destructuring

    useEffect(() => {
        if (window['adsbygoogle'] && !window['adsbygoogle'].loaded)
        (window['adsbygoogle'] = window['adsbygoogle'] || []).push({});
    }, []);

    return (
            <ins className="adsbygoogle"
                style={{ display: "block" }}
                data-ad-client={clientId} // Corrected data-ad-client attribute
                data-ad-slot={dataAdSlot} // Corrected data-ad-slot attribute
                data-ad-format="auto"
                data-full-width-responsive="true">
            </ins>
    );
};

export default AdsComponent;
