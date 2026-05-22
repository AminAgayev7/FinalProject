export const initBalance = () => {
    const existing = localStorage.getItem("balance");

    if (!existing) {
        localStorage.setItem("balance", JSON.stringify(1000));
    }
};