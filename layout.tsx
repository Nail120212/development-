local Players = game:GetService("Players")
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local Workspace = game:GetService("Workspace")
local TweenService = game:GetService("TweenService")

local LocalPlayer = Players.LocalPlayer
local PlayerGui = LocalPlayer:WaitForChild("PlayerGui")

local ScreenGui = Instance.new("ScreenGui")
ScreenGui.Name = "PhantomDNS"
ScreenGui.ResetOnSpawn = false
ScreenGui.Parent = PlayerGui

local MainFrame = Instance.new("Frame")
MainFrame.Size = UDim2.new(0, 240, 0, 280)
MainFrame.Position = UDim2.new(0.5, -120, 0.5, -140)
MainFrame.BackgroundColor3 = Color3.fromRGB(18, 18, 26)
MainFrame.BorderSizePixel = 0
MainFrame.Parent = ScreenGui
MainFrame.Draggable = true
MainFrame.Active = true
Instance.new("UICorner", MainFrame).CornerRadius = UDim.new(0, 14)

local Glow = Instance.new("ImageLabel")
Glow.Size = UDim2.new(1.5, 0, 1.5, 0)
Glow.Position = UDim2.new(-0.25, 0, -0.25, 0)
Glow.BackgroundTransparency = 1
Glow.Image = "rbxassetid://4996891970"
Glow.ImageColor3 = Color3.fromRGB(110, 150, 255)
Glow.ImageTransparency = 0.75
Glow.ScaleType = Enum.ScaleType.Slice
Glow.SliceCenter = Rect.new(49, 49, 450, 450)
Glow.ZIndex = -1
Glow.Parent = MainFrame

local TitleBar = Instance.new("Frame")
TitleBar.Size = UDim2.new(1, 0, 0, 36)
TitleBar.BackgroundColor3 = Color3.fromRGB(24, 24, 34)
TitleBar.BorderSizePixel = 0
TitleBar.Parent = MainFrame
Instance.new("UICorner", TitleBar).CornerRadius = UDim.new(0, 14)

local Title = Instance.new("TextLabel")
Title.Size = UDim2.new(1, -50, 1, 0)
Title.Position = UDim2.new(0, 12, 0, 0)
Title.BackgroundTransparency = 1
Title.Font = Enum.Font.GothamBold
Title.Text = "PHANTOM DNS"
Title.TextSize = 15
Title.TextColor3 = Color3.fromRGB(185, 195, 255)
Title.TextXAlignment = Enum.TextXAlignment.Left
Title.Parent = TitleBar

local MinimizeBtn = Instance.new("TextButton")
MinimizeBtn.Size = UDim2.new(0, 14, 0, 14)
MinimizeBtn.Position = UDim2.new(1, -24, 0.5, -7)
MinimizeBtn.BackgroundColor3 = Color3.fromRGB(255, 186, 80)
MinimizeBtn.Text = "−"
MinimizeBtn.Font = Enum.Font.GothamBold
MinimizeBtn.TextSize = 12
MinimizeBtn.TextColor3 = Color3.fromRGB(0,0,0)
MinimizeBtn.AutoButtonColor = false
MinimizeBtn.Parent = TitleBar
Instance.new("UICorner", MinimizeBtn).CornerRadius = UDim.new(1, 0)

MinimizeBtn.MouseEnter:Connect(function()
    TweenService:Create(MinimizeBtn, TweenInfo.new(0.15), {BackgroundColor3 = Color3.fromRGB(255, 210, 120)}):Play()
end)

MinimizeBtn.MouseLeave:Connect(function()
    TweenService:Create(MinimizeBtn, TweenInfo.new(0.15), {BackgroundColor3 = Color3.fromRGB(255, 186, 80)}):Play()
end)

local Content = Instance.new("ScrollingFrame")
Content.Size = UDim2.new(1, -16, 1, -46)
Content.Position = UDim2.new(0, 8, 0, 36)
Content.BackgroundTransparency = 1
Content.BorderSizePixel = 0
Content.ScrollBarThickness = 3
Content.ScrollBarImageColor3 = Color3.fromRGB(55, 55, 75)
Content.CanvasSize = UDim2.new(0,0,0,0)
Content.Parent = MainFrame

local ListLayout = Instance.new("UIListLayout")
ListLayout.Padding = UDim.new(0, 7)
ListLayout.HorizontalAlignment = Enum.HorizontalAlignment.Center
ListLayout.SortOrder = Enum.SortOrder.LayoutOrder
ListLayout.Parent = Content

local function updateCanvas()
    Content.CanvasSize = UDim2.new(0, 0, 0, ListLayout.AbsoluteContentSize.Y + 16)
end
ListLayout:GetPropertyChangedSignal("AbsoluteContentSize"):Connect(updateCanvas)

local minimized = false
MinimizeBtn.MouseButton1Click:Connect(function()
    minimized = not minimized
    if minimized then
        TweenService:Create(MainFrame, TweenInfo.new(0.35, Enum.EasingStyle.Quint), {Size = UDim2.new(0, 240, 0, 36)}):Play()
        Content.Visible = false
        MinimizeBtn.Text = "+"
    else
        TweenService:Create(MainFrame, TweenInfo.new(0.35, Enum.EasingStyle.Quint), {Size = UDim2.new(0, 240, 0, 280)}):Play()
        Content.Visible = true
        MinimizeBtn.Text = "−"
    end
end)

local CoinsEnabled = false
local CashEnabled = false
local ExperienceEnabled = false

local function CreateToggle(name, callback)
    local container = Instance.new("TextButton")
    container.Size = UDim2.new(0.94, 0, 0, 38)
    container.BackgroundColor3 = Color3.fromRGB(38, 38, 54)
    container.Text = name
    container.Font = Enum.Font.GothamSemibold
    container.TextSize = 14
    container.TextColor3 = Color3.fromRGB(220,220,255)
    container.TextXAlignment = Enum.TextXAlignment.Left
    container.AutoButtonColor = false
    container.Parent = Content
    Instance.new("UICorner", container).CornerRadius = UDim.new(0, 10)

    local padding = Instance.new("UIPadding")
    padding.PaddingLeft = UDim.new(0,12)
    padding.Parent = container

    local indicator = Instance.new("Frame")
    indicator.Size = UDim2.new(0, 34, 0, 18)
    indicator.Position = UDim2.new(1, -50, 0.5, -9)
    indicator.BackgroundColor3 = Color3.fromRGB(85, 85, 105)
    indicator.BorderSizePixel = 0
    indicator.Parent = container
    Instance.new("UICorner", indicator).CornerRadius = UDim.new(1,0)

    local dot = Instance.new("Frame")
    dot.Size = UDim2.new(0, 14, 0, 14)
    dot.Position = UDim2.new(0.1, 0, 0.5, -7)
    dot.BackgroundColor3 = Color3.new(1,1,1)
    dot.BorderSizePixel = 0
    dot.Parent = indicator
    Instance.new("UICorner", dot).CornerRadius = UDim.new(1,0)

    local state = false

    local function updateVisual()
        if state then
            TweenService:Create(indicator, TweenInfo.new(0.28, Enum.EasingStyle.Quint), {BackgroundColor3 = Color3.fromRGB(70, 210, 130)}):Play()
            TweenService:Create(dot, TweenInfo.new(0.28, Enum.EasingStyle.Quint), {Position = UDim2.new(0.58, 0, 0.5, -7)}):Play()
            TweenService:Create(container, TweenInfo.new(0.3), {BackgroundColor3 = Color3.fromRGB(48, 48, 68)}):Play()
        else
            TweenService:Create(indicator, TweenInfo.new(0.28, Enum.EasingStyle.Quint), {BackgroundColor3 = Color3.fromRGB(85, 85, 105)}):Play()
            TweenService:Create(dot, TweenInfo.new(0.28, Enum.EasingStyle.Quint), {Position = UDim2.new(0.1, 0, 0.5, -7)}):Play()
            TweenService:Create(container, TweenInfo.new(0.3), {BackgroundColor3 = Color3.fromRGB(38, 38, 54)}):Play()
        end
    end

    local hoverTweenIn = TweenService:Create(container, TweenInfo.new(0.2), {BackgroundColor3 = Color3.fromRGB(50, 50, 70)})
    local hoverTweenOut = TweenService:Create(container, TweenInfo.new(0.2), {BackgroundColor3 = state and Color3.fromRGB(48, 48, 68) or Color3.fromRGB(38, 38, 54)})

    container.MouseEnter:Connect(function() hoverTweenIn:Play() end)
    container.MouseLeave:Connect(function() hoverTweenOut:Play() end)

    container.MouseButton1Click:Connect(function()
        state = not state
        updateVisual()
        hoverTweenOut:Play()
        callback(state)
    end)
end

CreateToggle("Coins Farm", function(enabled)
    CoinsEnabled = enabled
    if enabled then
        task.spawn(function()
            local remotes = ReplicatedStorage:WaitForChild("Remotes")
            local receiveCoin = remotes:WaitForChild("RecieveCoin")
            local jeepnies = Workspace:WaitForChild("Jeepnies")
            local jeepney = jeepnies:WaitForChild(LocalPlayer.Name)
            local passenger = jeepney:WaitForChild("PassengerValues")
            while CoinsEnabled do
                receiveCoin:FireServer({
                    PassengerValues = passenger,
                    Password = 838875481,
                    Main = true,
                    Value = 300
                })
                task.wait(0.008)
            end
        end)
    end
end)

CreateToggle("Cash Farm", function(enabled)
    CashEnabled = enabled
    if enabled then
        task.spawn(function()
            local RecieveCash = ReplicatedStorage:WaitForChild("Remotes"):WaitForChild("RecieveCash")
            while CashEnabled do
                pcall(function()
                    for i = 1, 200 do
                        for j = 1, 100 do
                            RecieveCash:FireServer({
                                Value = 100,
                                Password = 28782728922
                            })
                        end
                    end
                end)
                task.wait(0.1)
            end
        end)
    end
end)

CreateToggle("100x Exp", function(enabled)
    ExperienceEnabled = enabled
end)

local ExpInput = Instance.new("TextBox")
ExpInput.Size = UDim2.new(0.94, 0, 0, 34)
ExpInput.BackgroundColor3 = Color3.fromRGB(32, 32, 48)
ExpInput.Text = "55"
ExpInput.Font = Enum.Font.Gotham
ExpInput.TextSize = 14
ExpInput.TextColor3 = Color3.new(1,1,1)
ExpInput.PlaceholderText = "Repeat (1-1000)"
ExpInput.ClearTextOnFocus = false
ExpInput.Parent = Content
Instance.new("UICorner", ExpInput).CornerRadius = UDim.new(0, 9)

ExpInput.FocusLost:Connect(function()
    local n = tonumber(ExpInput.Text)
    if n then
        ExpInput.Text = math.clamp(n, 1, 1000)
    else
        ExpInput.Text = "55"
    end
end)

local settings = { 
    repeatamount = 55, 
    exceptions = {"SayMessageRequest"} 
}

local mt = getrawmetatable(game)
local old = mt.__namecall
setreadonly(mt, false)

mt.__namecall = function(uh, ...)
    local args = {...}
    local method = getnamecallmethod()
    for _, v in pairs(settings.exceptions) do
        if uh.Name == v then
            return old(uh, ...)
        end
    end
    if ExperienceEnabled and (method == "FireServer" or method == "InvokeServer") then
        for i = 1, settings.repeatamount do
            old(uh, unpack(args))
        end
    end
    return old(uh, unpack(args))
end

setreadonly(mt, true)

local TeleportFrame = Instance.new("Frame")
TeleportFrame.Size = UDim2.new(0.94, 0, 0, 36)
TeleportFrame.BackgroundTransparency = 1
TeleportFrame.Parent = Content

local TeleportLayout = Instance.new("UIListLayout")
TeleportLayout.FillDirection = Enum.FillDirection.Horizontal
TeleportLayout.HorizontalAlignment = Enum.HorizontalAlignment.Center
TeleportLayout.Padding = UDim.new(0, 8)
TeleportLayout.Parent = TeleportFrame

local function CreateTeleport(text, cf)
    local btn = Instance.new("TextButton")
    btn.Size = UDim2.new(0.48, 0, 1, 0)
    btn.BackgroundColor3 = Color3.fromRGB(70, 80, 255)
    btn.Text = text
    btn.Font = Enum.Font.GothamBold
    btn.TextSize = 13
    btn.TextColor3 = Color3.new(1,1,1)
    btn.TextScaled = true
    btn.TextWrapped = true
    btn.AutoButtonColor = false
    btn.Parent = TeleportFrame
    Instance.new("UICorner", btn).CornerRadius = UDim.new(0, 8)

    btn.MouseEnter:Connect(function()
        TweenService:Create(btn, TweenInfo.new(0.2), {BackgroundColor3 = Color3.fromRGB(90, 100, 255)}):Play()
    end)

    btn.MouseLeave:Connect(function()
        TweenService:Create(btn, TweenInfo.new(0.2), {BackgroundColor3 = Color3.fromRGB(70, 80, 255)}):Play()
    end)

    btn.MouseButton1Click:Connect(function()
        local jeepnies = Workspace:FindFirstChild("Jeepnies")
        local jeepney = jeepnies and jeepnies:FindFirstChild(LocalPlayer.Name)
        local pos = cf.Position
        local _, yaw = cf:ToEulerAnglesYXZ()
        local flat = CFrame.new(pos) * CFrame.Angles(0, yaw, 0)
        if jeepney then
            jeepney:PivotTo(flat)
        elseif LocalPlayer.Character then
            LocalPlayer.Character:PivotTo(flat)
        end
    end)
end

CreateTeleport("Guiginto Terminal", CFrame.new(-137.74, 19, -3010.95))
CreateTeleport("Guiginto Droppoint", CFrame.new(1056.62, 17, 3241.82))

updateCanvas()
