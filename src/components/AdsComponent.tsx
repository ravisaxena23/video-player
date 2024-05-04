import React, { useEffect } from 'react';

const AdsComponent = (props: any) => {
    const { dataAdSlot, clientId } = props; // Corrected prop destructuring

    // useEffect(() => {
    //     try {
    //         ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
    //     } catch (e) {
    //         console.log(e);
    //     }
    // }, []);

    return (
        <>
            <ins className="adsbygoogle"
                style={{ display: "block" }}
                data-ad-client={clientId} // Corrected data-ad-client attribute
                data-ad-slot={dataAdSlot} // Corrected data-ad-slot attribute
                data-ad-format="auto"
                data-full-width-responsive="true">
            </ins>
        </>
    );
};

export default AdsComponent;
