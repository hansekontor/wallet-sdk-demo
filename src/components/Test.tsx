import { useApp, EventBus } from '@hansekontor/wallet-sdk';
import { useEffect } from 'react';

export const Test = () => {
    const { wallet, addWallet, cashtab, changeWallet, updateWallet, deleteWallet, send } = useApp();

    useEffect(() => {
        EventBus.on("WALLET_UPDATED", (event: string, type: string) => console.log("EVENT", event, "type", type));
        EventBus.on("WALLET_CHANGED", (event: string, type: string) => console.log("EVENT", event, "type", type));
        EventBus.on("WALLET_ADDED", (event: string, type: string) => console.log("EVENT", event, "type", type));
        EventBus.on("WALLET_DELETED", (event: string, type: string) => console.log("EVENT", event, "type", type));

    }, [])

    const handleCreateWallet = () => {
        addWallet();
    }
    
    const handleChangeWallet = (name: string) => {
        changeWallet(name);
    }

    const handleUpdateWallet = () => {
        updateWallet();
    }

    const handleDeleteWallet = (name: string) => {
        deleteWallet(name);
    }

    const handleSendToken = async () => {
        const amount = 10;
        // send back to own address
        const addresses = [wallet?.Path1899.cashAddress];
        const sandbox = true;

        const explorerLink = await send(amount, addresses, sandbox);
        console.log(explorerLink);
    }

    return (
        <>
            <div className='card'>
                <div>Balance: {wallet?.state.balances.totalBalance}</div>
                <div>Satoshi Balance: {wallet?.state.balances.totalBalanceInSatoshis}</div>
            </div>
            <div className='card'>
                <button onClick={handleCreateWallet}>Create Wallet</button>
                <button onClick={handleUpdateWallet}>Update Wallet</button>
                <button onClick={handleSendToken}>Send Token</button>
            </div>
            <div className='card'>
                <div>
                    <div>Stored Wallets:</div>
                    {cashtab.wallets.map((wallet: any, index: number) => {
                        return (
                            <div key={index}>
                                <div>{wallet.name}</div>
                                <button onClick={() => handleChangeWallet(wallet.name)}>Change</button>
                                <button onClick={() => handleDeleteWallet(wallet.name)}>Delete</button>
                            </div>
                        )
                    })}
                </div>
            </div>
            <div className='card'>
                <div>Transactions</div>
                    {wallet?.state.parsedTxHistory.map((tx: any, index: number) => {
                        return (
                            <div key={index}>
                                <a href={`https://explorer.e.cash/tx/${tx.hash}`}>{tx.hash}</a><br />
                            </div>
                        )
                    })}                    

            </div>

        </>

    )
}

export default Test;