import { expect, test } from "vitest";
import { getBotClassificationExplanation } from "./submissionFeedback.js";
import { EvaluationResult } from "./handleControlSubAccountEvaluation.js";

test("classification explanation includes evaluator reasons and details", () => {
    const results: EvaluationResult[] = [{
        botName: "Bot Group",
        hitReason: {
            reason: "Repeated promotional comments",
            details: [{ key: "Pattern", value: "Repeated links to example.com" }],
        },
        canAutoBan: true,
        metThreshold: true,
    }];

    const explanation = getBotClassificationExplanation(results);

    expect(explanation).toContain("Why Bot Bouncer classified this account as a bot:");
    expect(explanation).toContain("**Bot Group**: Repeated promotional comments");
    expect(explanation).toContain("Pattern: Repeated links to example.com");
});

test("classification explanation provides context when evaluator results are unavailable", () => {
    expect(getBotClassificationExplanation([])).toContain("No automated evaluator match details were recorded");
});

test("classification explanation escapes untrusted text and limits the number of matches", () => {
    const results: EvaluationResult[] = Array.from({ length: 9 }, (_, index) => ({
        botName: `**Evaluator ${index}**`,
        hitReason: "line one\n- injected list item",
        canAutoBan: true,
        metThreshold: true,
    }));

    const explanation = getBotClassificationExplanation(results);

    expect(explanation).not.toContain("**Evaluator 0**");
    expect(explanation).toContain("Evaluator 0");
    expect(explanation).not.toContain("\n- injected list item");
    expect(explanation).toContain("1 additional evaluator match(es) omitted.");
});
