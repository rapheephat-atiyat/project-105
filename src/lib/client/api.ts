export async function fetchApi(endpoint: string, method: string = 'GET', body?: any) {
    const res = await fetch(endpoint, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: body ? JSON.stringify(body) : undefined
    });

    const result = await res.json();

    if (!result.success) {
        throw new Error(result.error || 'Something went wrong');
    }

    return result.data;
}